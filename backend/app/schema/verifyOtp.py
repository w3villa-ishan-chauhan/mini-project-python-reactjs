from pydantic import BaseModel
class verifyOtp(BaseModel):
    email:str
    email_otp:str
    contact:str
    otp:str