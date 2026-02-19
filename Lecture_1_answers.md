A. What type of content did the server return? - JSON

B. Where do you see the resource ID? - 1

C. Can you see the HTTP status code? - No


## Task 2. Questions:

D. What does 200 mean? - OK

E. What category of status code is it? - Success

F. What other codes do you know? - Informational (100 - 199), Successful responses (200 – 299), Redirection messages (300 – 399), Client error responses (400 – 499), Server error responses (500 – 599)

## Task 3. Questions:

G. What would happen if Content-Type were `text/html` instead? - it would be a html page in response

H. Does the content-length match the actual size of the body? - yes

I. Why is Connection important in high-traffic systems? - to avoid bottleneck in request proccessing

## Task 4. Questions

J. What status code did you receive? - 404 - not found

K. Is there a response body? - no

L. How does it differ from the successful case? - we got an error without geting intended information

## Task 5. Questions

M. What status code did the server return? - 201

N. What does it mean? - Created. The request succeeded, and a new resource was created as a result.

O. What headers appear in this response? - date, content-type, content-length...

## Task 6. Questions

P. Does this API actually validate the token? - Yes

Q. What status code would a real secure API return if the token were invalid? 401 - unauthorised

R. What is the difference between `401` and `403`? - 401 - server does not recognize , 403 - server recognizes, but chooses not to allow


## Task 7. Questions

S. When would this be useful? - to debug

T. Why might monitoring systems use this approach? - to see dates, response status, other additional information

## Part 7 - Status Code Classification

U. Complete the following table:

| Code    | Category | Meaning |
| -------- | ------- | ------- |
| 200  | Success    | OK. The action requested by the client was received, understood, and accepted |
| 201 | Success    | Created. The request succeeded, and a new resource was created as a result.    |
| 400 | Client Error     | Bad Request     |
| 401 | Client Error     | Unauthorized     |
| 403 | Client Error     | Forbidden     |
| 404 | Client Error     | Not Found     |
| 500 | Server Error     | Internal Server Error. The server has encountered a situation it does not know how to handle.     |

## Part 8 - Discussion

V. Why is it bad practice to always return `200`, even on errors? - Disccussed in class.
