# cPanel Deployment Guide for Al Salamah Website

## Overview
This Next.js application has been configured for static export to work with cPanel hosting. The website content is now managed through a JSON file that can be easily edited by clients.

## Build Process

### 1. Build the Application
```bash
npm run build:cpanel
```

This command will:
- Create a static export of the Next.js application
- Copy the `.htaccess` file for proper routing
- Generate all static files in the `out` directory

### 2. Upload to cPanel

1. **Access cPanel File Manager**
   - Log into your cPanel account
   - Open "File Manager"
   - Navigate to `public_html` (or your domain's document root)

2. **Upload Files**
   - Upload all contents from the `out` directory to your domain's document root
   - Make sure to upload:
     - All HTML files
     - The `_next` directory (contains CSS, JS, and assets)
     - All image files
     - `data.json` (the content management file)
     - `.htaccess` (for proper routing)

3. **Set Permissions**
   - Ensure `.htaccess` has proper permissions (644)
   - Ensure all directories have 755 permissions
   - Ensure all files have 644 permissions

## Content Management

### Editing Website Content
The website content is stored in `data.json` file. Clients can edit this file to update:

- **Hero Section**: Title, subtitle, scroll text
- **Services**: Service descriptions and features
- **Statistics**: Company stats and numbers
- **Showcase**: Gallery images and features
- **Coverage Areas**: Regional information and headquarters
- **Company Information**: Contact details and company info

### How to Edit Content

1. **Via cPanel File Manager**:
   - Navigate to `public_html/data.json`
   - Click "Edit" to modify the content
   - Save changes

2. **Via FTP**:
   - Download `data.json`
   - Edit with any text editor
   - Upload the modified file back

3. **Content Structure**:
   ```json
   {
     "stats": {
       "data": [
         {
           "value": "27",
           "label": "Domestic\\nClients"
         }
       ]
     },
     "servicesSection": {
       "services": [
         {
           "title": "Service Name",
           "description": "Service description"
         }
       ]
     }
   }
   ```

## Important Notes

### Static Export Limitations
- No server-side API routes (all data is pre-built)
- No server-side rendering (SSR)
- No incremental static regeneration (ISR)
- Images are unoptimized (but still work)

### File Structure After Upload
```
public_html/
├── index.html (main page)
├── data.json (content management)
├── .htaccess (routing rules)
├── _next/ (Next.js assets)
├── admin/ (admin pages)
├── images and assets
└── other static files
```

### Updating the Website

1. **Content Changes Only**:
   - Edit `data.json` directly on the server
   - Changes are immediate

2. **Design/Code Changes**:
   - Make changes locally
   - Run `npm run build:cpanel`
   - Upload new `out` directory contents
   - Keep the existing `data.json` if content should be preserved

### Troubleshooting

1. **Routing Issues**:
   - Ensure `.htaccess` is uploaded and has correct permissions
   - Check if mod_rewrite is enabled on your hosting

2. **Content Not Loading**:
   - Verify `data.json` is in the root directory
   - Check browser console for fetch errors
   - Ensure JSON syntax is valid

3. **Images Not Displaying**:
   - Verify image files are uploaded
   - Check image paths in `data.json`
   - Ensure proper file permissions

### Performance Tips

1. **Image Optimization**:
   - Compress images before uploading
   - Use appropriate image formats (WebP when possible)

2. **Caching**:
   - The `.htaccess` file includes caching headers
   - Static assets are cached for 1 year
   - JSON data is cached for 1 day

## Support

For technical support or modifications, contact your development team. The website is now fully static and should work reliably on any cPanel hosting environment.

## Content Editing Examples

### Updating Statistics
```json
"stats": {
  "data": [
    {
      "value": "50+",
      "label": "Happy\\nClients"
    }
  ]
}
```

### Updating Services
```json
"servicesSection": {
  "services": [
    {
      "title": "New Service",
      "description": "Description of the new service offering"
    }
  ]
}
```

Remember to maintain proper JSON syntax when editing the content file.
