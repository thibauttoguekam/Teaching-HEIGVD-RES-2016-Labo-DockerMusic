FROM node:4.3.1
MAINTAINER Thibaut togue &  Tchuensu 

#
# When we build the image, we copy the executable jar in the image file system.
#



RUN npm install  moment
RUN npm install node-uuid 

EXPOSE 2205

COPY src /


ENTRYPOINT ["node", "/musicien.js"]



