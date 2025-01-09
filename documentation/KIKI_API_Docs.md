## KIKI API Docs

* Base URL: `/api`

## All routes that require Authentication

All endpoints that require a user to be logged in:
- Messages
- Requests
- Create Post
- User DashBoard
- Friends
All endpoints that require a current user to be logged in.

* **Request**: endpoints that require authentication
* **Error Response**: Require authentication
  * **Status Code**: 401
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Authentication required"
    }
    ```

* **Request**: Endpoints that require proper authorization
* **Error Response**: Require proper authorization
  * **Status Code**: 403
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

## Get Current User

 - **Require Auth**: False

 - **Request**:
    - **Method**: GET
    - Route Path: "/session"
    - **Body**: none
 - **Successful Response**:
    - status: 200
    - Headers
      - Content-Type: application/json ## Messages

      ### Create a Message

      ###  *Sets to this when/if you are returning a JSON response using jsonify()

    - **Body**:
    ```json
      {
         "user": {
            "id": 0,
            "username": "VolunteerLyfe",
            "email": "green4lyfe@planet.com",
            "firstName": "Susan",
            "lastName":"Markcul",
            "bio": "bio",
            "city": "city",
            "state": "state",
            "level": 1,
            "native": "native",
            "learning": "learning",
            "profile_pic": "url",
            "pref_theme": "theme",
            /* BONUS:
            "pref_chatroom":"chatroom theme",
            */
         }
      }

* **Successful Response**:when there is no logged in user.
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "user": "Null"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* **Require Authentication**: false
* **Request**
  * **Method**: POST
  * **Route path**: `/session`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "credential": "green4lyfe@planet.com",
      "password": "secret password"
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "user": {
        "id": 0,
        "username": "VolunteerLyfe",
        "email": "green4lyfe@planet.com",
        "firstName": "Susan",
        "lastName":"Markcul",
        "bio": "bio",
        "city": "city",
        "state": "state",
        "level": 1,
        "native": "native",
        "learning": "learning",
        "profile_pic": "url",
        "pref_theme": "theme",
        /* BONUS:
        "pref_chatroom":"chatroom theme",
        */
      }
    }
    ```

* **Error Response**: Invalid credentials
  * **Status Code**: 401
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* **Error response**: Body validation errors
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```
 ### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* **Require Authentication**: false
* **Request**
  * **Method**: POST
  * **Route path**: `/users`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
       "id": 0,
       "username": "VolunteerLyfe",
       "email": "green4lyfe@planet.com",
       "firstName": "Susan",
       "lastName":"Markcul",
       "bio": "bio",
       "city": "city",
       "state": "state",
       "level": 1,
       "native": "native",
       "learning": "learning",
    }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "user": {
         "id": 0,
        "username": "VolunteerLyfe",
        "email": "green4lyfe@planet.com",
        "firstName": "Susan",
        "lastName":"Markcul",
        "bio": "bio",
        "city": "city",
        "state": "state",
        "level": 1,
        "native": "native",
        "learning": "learning",
        "profile_pic": "default value",
        "pref_theme": null
      }
    }
    ```

* **Error response**: User already exists with the specified email or username
  * **Status Code**: 500
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists",
        "username": "User with that username already exists"
      }
    }
    ```

* **Error response**: Body validation errors
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "city": "City is required",
        "state": "State is required",
        "native": "Native is required",
        "learning": "Learning is required",
        "level": "Level is required"
      }
    }
    ```
### Get all Users

Returns all the Users.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/users`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Users": [
        {
            "id": 0,
            "username": "VolunteerLyfe",
            "email": "green4lyfe@planet.com",
            "firstName": "Susan",
            "lastName":"Markcul",
            "bio": "bio",
            "city": "city",
            "state": "state",
            "level": 1,
            "native": "native",
            "learning": "learning",
            "profile_pic": "default value",
            "pref_theme": "theme"
        }
      ]
    }
    ```

### Get Current User

Returns the current User.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/users/:user_id`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Users": [
        {
            "id": 0,
            "username": "VolunteerLyfe",
            "email": "green4lyfe@planet.com",
            "firstName": "Susan",
            "lastName":"Markcul",
            "bio": "bio",
            "city": "city",
            "state": "state",
            "level": 1,
            "native": "native",
            "learning": "learning",
            "profile_pic": "default value",
            "pref_theme": "theme"
        }
      ]
    }
    ```

### View User Friends

Returns all Friends in User Friend List

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/friends`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Friends": [
        {
            "id": 0,
            "username": "VolunteerLyfe",
            "email": "green4lyfe@planet.com",
            "firstName": "Susan",
            "lastName":"Markcul",
            "bio": "bio",
            "city": "city",
            "state": "state",
            "level": 1,
            "native": "native",
            "learning": "learning",
            "profile_pic": "default value",
            "nickname": "nickname"
        }
      ]
    }
    ```
* **Error Response**: Friends not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Friends not found"
    }
    ```

### View Friend Details

Returns details for specific Friend.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/friends`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
        "id": 0,
        "username": "VolunteerLyfe",
        "email": "green4lyfe@planet.com",
        "firstName": "Susan",
        "lastName":"Markcul",
        "bio": "bio",
        "city": "city",
        "state": "state",
        "level": 1,
        "native": "native",
        "learning": "learning",
        "profile_pic": "default value",
        "nickname": "nickname"
    }
    ```

* **Error Response**: Friend not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Friend not found"
    }
    ```

### Edit a Friend's Nickname

Edits a friends nickname to be displayed for the user.

* **Require Authentication**: true
* **Require Authorization**: User must be organizer of event to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/friends/:friend_id`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
        {
          "nickname": "nickname"
        },
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
        "id": 0,
        "username": "VolunteerLyfe",
        "email": "green4lyfe@planet.com",
        "firstName": "Susan",
        "lastName":"Markcul",
        "bio": "bio",
        "city": "city",
        "state": "state",
        "level": 1,
        "native": "native",
        "learning": "learning",
        "profile_pic": "default value",
        "nickname": "nickname"
    }
    ```

* **Error Response**: Friend not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Friend not found"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "nickname": "Nickname is required",
      }
    }
    ```

### Remove a Friend

Removes a Friend from Friend List.

* **Require Authentication**: true
* **Require Authorization**: Friend must be on User's friend list.
* **Request**
  * **Method**: DELETE
  * **Route path**: `/friends/:friend_id`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Successfully removed friend"
    }
    ```

* **Error Response**: Friend not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Friend not found"
    }
    ```

* **Error Response**: User not authorized
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden"
    }
    ```

## Messages

### View all Messages

Return all the Messages associated with the User

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/messages`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Messages": [
        {
          "id": 1,
          "sender_id": 2,
          "recipient_id": 3,
          "message": "Message text",
          "updated_at": "timestamp",
          "created_at": "timestamp"
        },
        {
          "id": 2,
          "sender_id": 3,
          "recipient_id": 2,
          "message": "Message text",
          "updated_at": "timestamp",
          "created_at": "timestamp"
        },
        {
          "id": 5,
          "sender_id": 3,
          "recipient_id": 4,
          "message": "Message text",
          "updated_at": "timestamp",
          "created_at": "timestamp"
        }
      ]
    }
    ```
* **Error response**: Couldn't find any Messages asscociated with User
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No messages found"
    }
    ```

### Create a Message

Creates Message written by User

* **Require Authentication**: true
* **Require Authorization**: User must be friends with recipient
* **Request**
  * **Method**: POST
  * **Route path**: `/messages/:message_id`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "message": "Looking forward to the event!"
      }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
        "id": 1,
        "sender_id": 2,
        "recipient_id": 3,
        "message": "Looking forward to the event!",
        "updated_at": "timestamp",
        "created_at": "timestamp"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Message cannot be blank",
      }
    }
    ```

* **Error Response**: User is not friends with recipient
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```

### Edit a Message

Edits a sent Message

* **Require Authentication**: true
* **Require Authorization**: User must be creator of Message to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/messages/:message_id`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "message": "What landmarks should I look for at the event meeting spot?"
      },
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
        "id": 1,
        "sender_id": 2,
        "recipient_id": 3,
        "message": "What landmarks should I look for at the event meeting spot?",
        "updated_at": "timestamp",
        "created_at": "timestamp"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Message cannot be blank"
      }
    }
    ```

* **Error Response**: Message does not belong to user
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```
* **Error Response**: Message not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Message not found",
    }
    ```

### Delete a Message

Deletes a Message

* **Require Authentication**: true
* **Require Authorization**: Message must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/messages/:messageId`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message_id": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Message removed successfully"
    }
    ```

* **Error Response**: Message does not belong to user
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Message with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```
## Requests

### View all Requests

Return all the Requests associated with a User

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/requests`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Sent": [
        {
            "id":1,
            "sender_id ": 2,
            "recipient_id": 3,
            "pending": true
        },
        {
            "id":1,
            "sender_id ": 2,
            "recipient_id": 1,
            "pending": true
        }
      ],
      "Received": [
        {
            "id":1,
            "sender_id ": 3,
            "recipient_id": 2,
            "pending": true
        },
        {
            "id":1,
            "sender_id ": 4,
            "recipient_id": 2,
            "pending": true
        }
      ]
    }
    ```
* **Error response**: Couldn't find any Requests for given User
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No requests found"
    }
    ```

### Create a Request

Creates Request to be sent by User

* **Require Authentication**: true
* **Require Authorization**: User must not be friends or have a pending request
* **Request**
  * **Method**: POST
  * **Route path**: `/requests`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "message": "Looking forward to the event!"
      }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
        "id":1,
        "sender_id ": 4,
        "recipient_id": 2,
        "pending": true
    }
    ```

* **Error Response**: User request exists already
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Request already exists",
      }
    }
    ```

* **Error Response**: User has a pending request from recipient
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Request already exists",
      }
    }
    ```

### Delete a Request

Delets a Request

* **Require Authentication**: true
* **Require Authorization**: Request must be associated with User
* **Request**
  * **Method**: DELETE
  * **Route path**: `/request/:request_id`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "request_id": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request deleted successfully"
    }
    ```

* **Error Response**: User is not associated with request
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Request with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request couldn't be found"
    }
    ```