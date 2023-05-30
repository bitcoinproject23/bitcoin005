from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


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
        account_tile,
        currency,
        wallet,
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
            account_tile=account_tile,
            currency=currency,
            wallet=wallet,
        )
        user.set_password(user.password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email,
        first_name,
        last_name,
        leverage,
        mobile_phone,
        zip_code,
        country,
        account_type,
        account_tile,
        currency,
        wallet,
    ):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            leverage=leverage,
            mobile_phone=mobile_phone,
            zip_code=zip_code,
            country=country,
            account_type=account_type,
            account_tile=account_tile,
            currency=currency,
            wallet=wallet,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    leverage = models.DecimalField(max_digits=7, decimal_places=4)
    mobile_phone = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    account_type = models.CharField(max_length=255)
    account_tile = models.CharField(max_length=255)
    currency = models.CharField(max_length=255)
    wallet = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "leverage",
        "mobile_phone",
        "zip_code",
        "country",
        "account_type",
        "account_tile",
        "currency",
        "wallet",
    ]

    def __str__(self):
        return self.email
