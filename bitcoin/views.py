from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login
from django.views import View

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
    return render(request, "index.html")