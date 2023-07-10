from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login
from django.views import View
from coinbase_commerce.client import Client
from django.conf import settings 

User = get_user_model()

@csrf_protect
def signUp(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        leverage = request.POST["leverage"]
        mobile_phone = request.POST["mobile_number"]
        zip_code = request.POST["zip"]
        country = request.POST["country"]
        account_type = request.POST["account_type"]
        account_title = request.POST["account_title"]
        currency = request.POST["currency"]
        wallet = request.POST["wallet"]
        user = User.objects.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            leverage=leverage,
            mobile_phone=mobile_phone,
            zip_code=zip_code,
            country=country,
            account_type=account_type,
            account_title=account_title,
            currency=currency,
            wallet=wallet,
        )
        user.set_password(password)
        user.save()
    return render(request, "sign-up.html")





class CustomLoginView(View):
    template_name = 'sign-in.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        email = request.POST.get('mail')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            # Redirect to a success page or use 'reverse' to redirect to a specific URL
            return redirect('home')
        else:
            # Handle invalid login credentials
            return render(request, self.template_name, {'error': 'Invalid email or password'})



@csrf_protect
def home(request):
    client = Client(api_key=settings.COINBASE_COMMERCE_API_KEY)
    domain_url = 'http://localhost:8000/'
    product = {
        'name': 'STARTER',
        'local_price': {
            'amount': '70.00',
            'currency': 'USD'
        },
        'pricing_type': 'fixed_price',
        'redirect_url': domain_url + 'success/',
        'cancel_url': domain_url + 'cancel/',
    }

    product2 = {
        'name': 'SILVER',
        'local_price': {
            'amount': '200.00',
            'currency': 'USD'
        },
        'pricing_type': 'fixed_price',
        'redirect_url': domain_url + 'success/',
        'cancel_url': domain_url + 'cancel/',
    }

    product3 = {
        'name': 'GOLD',
        'local_price': {
            'amount': '500.00',
            'currency': 'USD'
        },
        'pricing_type': 'fixed_price',
        'redirect_url': domain_url + 'success/',
        'cancel_url': domain_url + 'cancel/',
    }

    product4 = {
        'name': 'PLATINUM',
        'local_price': {
            'amount': '12000.00',
            'currency': 'USD'
        },
        'pricing_type': 'fixed_price',
        'redirect_url': domain_url + 'success/',
        'cancel_url': domain_url + 'cancel/',
    }
    charge = client.charge.create(**product)
    charge2 = client.charge.create(**product2)
    charge3 = client.charge.create(**product3)
    charge4 = client.charge.create(**product4)

    return render(request, "index.html", {'charge': charge, 'charge2': charge2, 'charge3': charge3, 'charge4': charge4})