const respond = (request, response, status, object, contentType) => {
  console.log(contentType);
  if (contentType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (object.id) {
      responseXML = `${responseXML} <id>${object.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;

    response.writeHead(status, {
      'Content-Type': contentType,
    });
    response.write(responseXML);
    response.end();
  } else {
    console.log(status, contentType);
    response.writeHead(status, {
      'Content-Type': contentType,
    });
    response.write(JSON.stringify(object));
    response.end();
  }
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  console.log('here');
  respond(request, response, 200, responseJSON, acceptedTypes);
  console.log(respond);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    respond(request, response, 400, responseJSON, acceptedTypes);
    console.log(respond);
  } else {
    respond(request, response, 200, responseJSON, acceptedTypes);
    console.log(respond);
  }
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'unauthorized';

    respond(request, response, 401, responseJSON, acceptedTypes);
    console.log(respond);
  } else {
    respond(request, response, 200, responseJSON, acceptedTypes);
    console.log(respond);
  }
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'forbidden',
    message: 'You do not have access to this content.',
  };

  respond(request, response, 403, responseJSON, acceptedTypes);
  console.log(respond);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong.',
  };

  respond(request, response, 500, responseJSON, acceptedTypes);
  console.log(respond);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  respond(request, response, 501, responseJSON, acceptedTypes);
  console.log(respond);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };

  respond(request, response, 404, responseJSON, acceptedTypes);
  console.log(respond);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
