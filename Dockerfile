FROM --platform=linux/amd64 node:18
WORKDIR /home/paricia2

COPY package*.json /home/paricia2

RUN npm install 

COPY . /home/paricia2/

EXPOSE 5000

CMD ["npm", "start"]