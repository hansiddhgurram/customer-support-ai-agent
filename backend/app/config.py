from pydantic_settings import BaseSettings

from dotenv import load_dotenv


load_dotenv()


class Settings(BaseSettings):

    GROQ_API_KEY: str
    SECRET_KEY: str

    class Config:
        env_file = "backend/.env"


settings = Settings()