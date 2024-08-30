# Mini Project

## Overview
This project is a comprehensive web application that combines FastAPI for the backend and ReactJS for the frontend. It offers a robust set of features for user authentication, profile management, payment processing, access-control and admin management.

## Features

**Signup, Login and OTP-Screenshot**
![1](https://github.com/user-attachments/assets/4027360f-8be5-424e-b127-d9948c2c4c97)


**Email and Text OTP-Screenshot**
![1725013658661](https://github.com/user-attachments/assets/a71e1ba9-a191-4465-8a88-d9f2095af86e)


- **Signup & Login:**
  - **Social Signup:** Users can sign up using social media accounts (e.g., Google, Facebook). Existing accounts with the same email will be merged.
  - **Standard Signup:** Users can create an account using email and password. A confirmation email is sent for activation.
  - **Verification:** Email and OTP verification ensure secure user registration and authentication.
  - **Login:** Users can log in using email/password or social media accounts. Only verified accounts can access the dashboard.
    

**Dashboard Panel-Screenshot**
![Screenshot from 2024-08-30 13-14-51](https://github.com/user-attachments/assets/4ca870c3-644f-43a4-beb1-60e3fd59ed3c)


- **Profile Management:**
  - **Profile Picture Upload:** Silver Plan users can upload and view their profile picture and Base users get a predefined profile pic template.
  - **Address Management:** All users can manage their address with auto-suggestions and display it on a map.
  - **Profile Download:** Gold plan users can download their profile information in a user-friendly format.
  - **Profile Download-Screenshot:**
  -  ![Screenshot from 2024-08-30 16-46-13](https://github.com/user-attachments/assets/9ceb309e-ce59-4ec5-987a-7ec5ed4621a5)
    

- **Payment Processing:**
  - **Payment Gateway:** Secure payments are processed via Stripe. Supports Base (Free), Silver, and Gold subscription plans with immediate access upgrades.
    

- **Access Control:**
  - **Free Plan:** Provides basic access to features.
  - **Silver Plan:** Offers additional features for paid users.
  - **Gold Plan:** Grants full access to all features for premium users.
    

 **Base vs Gold User-Screenshot** 
![Screenshot from 2024-08-30 16-28-31](https://github.com/user-attachments/assets/d3df275a-3d09-4915-ade3-d43301df6fd5)



 **Payment-Stripe and Maps-Mapbox-Screenshot**
![1725015758444](https://github.com/user-attachments/assets/0acc2306-a20f-4e58-8587-fd7645245bd7)


- **Admin Panel:**
  - **Admin Role:** Special privileges like upgrading and downgrading user subscription.
  - **User Management:** Admins can view and manage users with search, filter, and pagination functionalities.
  - **User Listing:** Admins can see all users with basic details and perform search and pagination.
    **Admin panel-Screenshot**
![1725016397797](https://github.com/user-attachments/assets/74aeaf8d-49b7-4db8-8cb7-5e1b7898aebb)


## Technologies Used
- **Backend:** FastAPI , Python
- **Frontend:** ReactJS
- **Notification Service:** Twilio (free service)
- **Profile Pic Upload in Bucket:** Firebase Storage Bucket 
- **Payment Gateway:** Stripe (test mode)
- **Maps and Address:** Mapbox (free service)
- **Authentication:** Google Auth0 (free service)
- **Database and ORM:** Mysql and Sqlalchemy


