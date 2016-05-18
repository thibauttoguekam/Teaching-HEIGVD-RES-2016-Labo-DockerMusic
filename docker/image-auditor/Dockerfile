FROM node:4.3.1
MAINTAINER thibaut togue & tchuensu rodrigue

#
# When we build the image, we copy the executable jar in the image file system.
#



RUN npm install moment
EXPOSE 2205
COPY  src /
ENTRYPOINT ["node", "/auditors.js"]


