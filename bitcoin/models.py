from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(
        self,
        email,
        first_name,
        last_name,
        leverage,
        mobile_phone,
        zip_code,
        country,
        account_type,
        account_title,
        currency,
        wallet,
        password=None,
        **extra_fields
    ):
        user = self.model(
            email=self.normalize_email(email),
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
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def _create_superuser(self, email, password=None, **extra_fields):
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email,
        password,  # Add the password parameter here
        **extra_fields
    ):
        user = self._create_superuser(email, password=password, is_staff=True, is_superuser=True, **extra_fields)  # Pass the password parameter
        return user



class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    leverage = models.DecimalField(max_digits=7, decimal_places=4, default=0)
    mobile_phone = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    account_type = models.CharField(max_length=255, null=True, blank=True)
    account_title = models.CharField(max_length=255, null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    wallet = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = [
    #     "first_name",
    #     "last_name",
    #     "leverage",
    #     "mobile_phone",
    #     "zip_code",
    #     "country",
    #     "account_type",
    #     "account_title",
    #     "currency",
    #     "wallet",
    # ]
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
