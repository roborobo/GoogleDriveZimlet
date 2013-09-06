#Google Drive Zimlet
This is a zimlet for the Zimbra Web Collaboration Suite (http://www.zimbra.com) that provides integration with Google Drive (https://drive.google.com/).  This zimlet uses the Google Drive Api (https://developers.google.com/drive/), the Google Drive SDK, and the Google Picker API (https://developers.google.com/picker/).

Thanks to jwagner79, whose Dropbox zimlet this is based off of. 

#Requirements
To use this zimlet, you need a Google APIs Console project (http://developers.google.com/console). 
After creating a new project, under the Service section, enable the Drive API, Drive SDK, and Google Picker API.
Under the API Access section, create a client ID by selecting Create an OAuth 2.0 client ID.
You must provide your site address for the field "Javascript origins".

You now have a Client ID and an API key. 

In the config_template.xml file, replace the filler text with the correct Client ID and API key. 

Note: When rezipping the files to deploy the zimlet with zmzimletctl, be sure to zip the files inside the com_zimbra_googledrive folder, not the folder itself

The Client ID is the numerical portion of the address given: <Client ID>.apps.googleusercontent.com

<property name="ZimbraGoogleApiKey">
<property name="ZimbraGoogleOAuthId">

This zimlet has only been tested for the Zimbra 8 install for the Ajax client.

#What it does
The Google Drive Zimlet allows users to attach a Google Drive document to a message.

#Attach
This zimlet utilizes the Google Picker api to "attach" a file from Google Drive to a message you are composing. To attach from Google Drive, select the Google Drive optino from the Attach dropdown. It will open a new window (or ask for authentication) to a picker for Google Drive, where the user can navigate to the file that is to be attached. Currently attachments must be done one at a time. 

#How you can help
The code is open source.  You can help improve it by filing issues, contributing to translations and code improvements.

#Common questions:

- The configuration file cannot be found/is not used when deploying the zimlet, so I get an OAuth error (or nothing seems to happen when clicking the Google Drive option from the dropdown)!

Extract the config_template.xml file and run: 

zmzimletctl configure config_template.xml

- My zimlet fails to deploy!

Try running the individual deployment commands:

zmzimletctl install <zimlet.zip>
zmzimletctl ldapDeploy <zimlet>
zmzimletctl acl <zimlet> default grant
zmzimletctl enable <zimlet>
