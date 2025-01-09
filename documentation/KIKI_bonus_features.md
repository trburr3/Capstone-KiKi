## Posts

### View all Public Posts

Return all Posts where Private is False

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/posts`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Posts": [
        {
            "id": 1,
            "user_id": 3,
            "body": "body",
            "level": 1,
            "language": "language",
            "title": "title",
            "private": false,
            "updated_at" :"timestamp",
            "created_at": "timestamp"
        }
      ]
    }
    ```
* **Error response**: Couldn't find any Posts where Private is false or no Posts at all
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No posts found"
    }
    ```

### View all User Posts

Return all Posts made by User

* **Require Authentication**: true
* **Require Authorization**: User must own posts
* **Request**
  * **Method**: GET
  * **Route path**: `/profile/posts`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Posts": [
        {
            "id": 1,
            "user_id": 3,
            "body": "body",
            "level": 1,
            "language": "language",
            "title": "title",
            "private": false,
            "updated_at" :"timestamp",
            "created_at": "timestamp"
        }
      ]
    }
    ```
* **Error response**: Couldn't find any Posts
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No posts found"
    }
    ```


### Create a Post

Creates a Post

* **Require Authentication**: true
* **Request**
  * **Method**: POST
  * **Route path**: `/posts`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "user_id": 3,
        "body": "body",
        "level": 1,
        "language": "language",
        "title": "title",
        "private": false
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
        "user_id": 3,
        "body": "body",
        "level": 1,
        "language": "language",
        "title": "title",
        "private": false,
        "updated_at" :"timestamp",
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
        "body": "Body is required",
        "level": "Level is required",
        "language": "Language is required",
        "title": "Title is required",
        "private": "Privacy must be selected",
      }
    }
    ```

### Edit a Post

Edits Post if user is creator.

* **Require Authentication**: true
* **Require Authorization**: User must be creator of Post to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/posts/:post_id`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "user_id": 3,
        "body": "body",
        "level": 1,
        "language": "language",
        "title": "title",
        "private": false
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
        "user_id": 3,
        "body": "body",
        "level": 1,
        "language": "language",
        "title": "title",
        "private": false,
        "updated_at" :"timestamp",
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
        "body": "Body is required",
        "level": "Level is required",
        "language": "Language is required",
        "title": "Title is required",
        "private": "Privacy must be selected",
      }
    }
    ```

* **Error Response**: Post does not belong to user
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```
* **Error Response**: Post not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Post not found",
    }
    ```

### Delete a Post

Deletes a Post

* **Require Authentication**: true
* **Require Authorization**: Post must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/groups/:groupId/messages/:messageId`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "post_id": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Post deleted successfully"
    }
    ```

* **Error Response**: Post does not belong to user
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Post with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Post couldn't be found"
    }
    ```

## Comments

### View all Comments specified by Post Id

Return all the Comments associated with a Post

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/posts/:post_id/comments`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Comments": [
        {
            "id": 1,
            "post_id": 3,
            "user_id": 2,
            "body": "body",
            "updated_at": "timestamp",
            "created_at": "timestamp"
        },
        {
            "id": 2,
            "post_id": 3,
            "user_id": 3,
            "body": "body",
            "updated_at": "timestamp",
            "created_at": "timestamp"
        }
      ]
    }
    ```
* **Error response**: Couldn't find any Comments with the specified Post id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No comments found"
    }
    ```

### Create a Comment for a Post

Creates Comment for a Post

* **Require Authentication**: true
* **Request**
  * **Method**: POST
  * **Route path**: `/posts/:post_id/comments`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "body": "Looking forward to the event!"
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
        "post_id": 3,
        "user_id": 2,
        "body": "Looking forward to the event!",
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
        "message": "Comment cannot be blank",
      }
    }
    ```

### Edit a Comment on a Post specified by Comment Id

Edits Comment on Post page if user is creator.

* **Require Authentication**: true
* **Require Authorization**: User must be creator of Comment to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/posts/:post_id/comments/:comment_id`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "body": "What landmarks should I look for at the event meeting spot?"
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
        "post_id": 3,
        "user_id": 2,
        "body": "What landmarks should I look for at the event meeting spot?",
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
        "message": "Comment cannot be blank"
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
* **Error Response**: Comment not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Comment not found",
    }
    ```

### Delete a Comment

Deletes a comment

* **Require Authentication**: true
* **Require Authorization**: Comment must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/posts/:post_id/comments/:comment_id`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "comment_id": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Comment delete successfully"
    }
    ```

* **Error Response**: Comment does not belong to user
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Comment with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Comment couldn't be found"
    }
    ```

## Likes

### Create a Like specified by Post Id and/or Comment Id

Creates a Like to be associated with a Post or Comment

* **Require Authentication**: true
* **Require Authorization**: User must not be author of Post
* **Request**
  * **Method**: POST
  * **Route path**: `/likes`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "post_id": 1
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
        "user_id": 3,
        "post_id": 1,
        "comment_id": null
    }
    ```

* **Error Response**: User is Post/Comment authpr
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```

### Delete a Like

Removes a Like

* **Require Authentication**: true
* **Require Authorization**: Like must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/likes/:like_id`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "like_id": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Like removed successfully"
    }
    ```

* **Error Response**: Like does not belong to user
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Like with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Like couldn't be found"
    }
    ```