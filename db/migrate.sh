if [ ! -f .env ]      
then
  export $(cat .env.development.local | xargs)
fi

npx prisma migrate dev