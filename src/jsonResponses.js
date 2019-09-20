const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    id: 'forbidden',
    message: 'You do not have access to this content.',
  };

  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong.',
  };

  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };

  respondJSON(request, response, 404, responseJSON);
};
