export const imageUploaderCode = `{
  "Version": "1.0.0",
  "Name": "Pctr App Image Uploader",
  "DestinationType": "ImageUploader",
  "RequestMethod": "POST",
  "RequestURL": "https://pctr.app/api/images?api_key={{key}}",
  "Body": "MultipartFormData",
  "FileFormName": "image",
  "URL": "$json:url$"
}`;

export const urlUploaderCode = `{
  "Version": "1.0.0",
  "Name": "Pctr App Url Uploader",
  "DestinationType": "URLShortener",
  "RequestMethod": "POST",
  "RequestURL": "https://pctr.app/api/urls?api_key={{key}}",
  "Body": "MultipartFormData",
  "Arguments": {
    "url": "$input$"
  }
  "URL": "$json:url$"
}`;