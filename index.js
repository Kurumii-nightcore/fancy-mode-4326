addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    // Fetch the response from the origin server
    const response = await fetch(request);
    
    // Only process HTML responses
    if (response.headers.get('Content-Type').includes('text/html')) {
      // Read the response body as text
      const body = await response.text();
  
      // Define the OG meta tags to inject
      const ogTitle = 'Your Website Title';  // Replace with your website title or dynamically generate it
      const ogDescription = 'Description of your website or content';  // Replace with your description
      const ogImage = 'https://example.com/your-image.jpg';  // Replace with a valid image URL
      const ogUrl = request.url;  // Use the current URL as the OG URL
  
      // Inject the OG tags into the <head> section of the HTML
      const newBody = body.replace(
        /<head>/i,  // Match the opening <head> tag
        `<head>
          <meta property="og:title" content="${ogTitle}">
          <meta property="og:description" content="${ogDescription}">
          <meta property="og:image" content="${ogImage}">
          <meta property="og:url" content="${ogUrl}">`
      );
  
      // Return the modified response with the new body and headers
      return new Response(newBody, {
        headers: response.headers
      });
    }
  
    // If the response is not HTML, just return the original response
    return response;
  }
  