# Smart FHIR InAPI App

The app is an implementation of the Innovaccer's FHIR InAPI Resources.
A sample APP is hosted <a href="./index.html">here</a>.

# Getting Started

## Clone the Repo
The user needs to clone the repo into his system.
```
$ git clone  https://github.com/RhnSaxena/RhnSaxena.github.io.git <directory>
```
Specify the directory, where the repo must be cloned.

## Configuration

The user must configure the config file before using the application. 

# Instructions

## Credentials

The app uses **OAuth 2.0** for authorization. 
The user has to enter the `client_id` and `Client_id` secret to receive `access_token`. 
Upon receiving a valid access_token the user can proceed to use the InAPI resources.

## InAPI Resources

The user can use the FHIR resources listed on the left side. Upon click any of the resource a list of instances will be generated. The user can switch to other resource by clicking on it.

## Query Parameter

The user can generate the list as per the parameter he/she wants to choose.
The Query Parameter drop down list has the available parameters. The user must enter the value and click the submit button.


# Licensing
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This software is licensed under the MIT License and the terms are mentioned in the file named <a href="./LICENSE">LICENSE</a> in this directory.