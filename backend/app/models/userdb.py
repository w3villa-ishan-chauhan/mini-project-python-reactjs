
from sqlalchemy import Column,Integer,String
from app.database import Base
class userSchema(Base):   
   __tablename__="users"
   id=Column(Integer,primary_key=True,index=True)
   name = Column(String(255), nullable=True, index=True)
   email=Column(String(255),unique=True,index=True)
   hash_password=Column(String(255),nullable=True)
   contact=Column(String(20),unique=True,index=True,nullable=True)
   profile_image = Column(String(255), nullable=True) 
   residing_address=Column(String(255),unique=True,index=True,nullable=True)
   subscription_type=Column(String(255),default="Base",index=True,nullable=True)
   role = Column(String(50), default="user", nullable=False, index=True)

   
   