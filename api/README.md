
# API Documentation

This document provides an overview of the API endpoints available in the application, along with the corresponding request and response schemas.

## Table of Contents
- [Introduction](#introduction)
- [Base URL](#base-url)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Category Routes](#category-routes)
  - [Product Routes](#product-routes)
- [Schemas](#schemas)

## Introduction

This application provides a set of APIs for managing users, categories, and products. It is built with TypeScript and Express.js, leveraging Swagger for API documentation.

## Base URL

```
http://localhost:3000
```

## Routes

### User Routes

- **Create User**
  - **POST** `/user`
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Responses**:
    - `201`: User created successfully
    - `400`: Bad request

- **Authenticate User**
  - **POST** `/auth`
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Responses**:
    - `200`: Authentication successful
    - `401`: Unauthorized

### Category Routes

- **List Categories**
  - **GET** `/category`
  - **Headers**: Requires authentication
  - **Responses**:
    - `200`: List of categories
    - `401`: Unauthorized

- **Create Category**
  - **POST** `/category`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Responses**:
    - `201`: Category created successfully
    - `400`: Bad request

- **Update Category**
  - **PUT** `/category`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "id": "string",
      "name": "string",
      "description": "string"
    }
    ```
  - **Responses**:
    - `200`: Category updated successfully
    - `404`: Category not found

- **Delete Category**
  - **DELETE** `/category`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "id": "string"
    }
    ```
  - **Responses**:
    - `200`: Category deleted successfully
    - `404`: Category not found

### Product Routes

- **List Products**
  - **GET** `/product`
  - **Responses**:
    - `200`: List of products

- **Create Product**
  - **POST** `/product`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "name": "string",
      "price": "number",
      "description": "string",
      "amount": "number",
      "category_id": "string"
    }
    ```
  - **Responses**:
    - `201`: Product created successfully
    - `400`: Bad request

- **Edit Product**
  - **PUT** `/product`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "product_id": "string",
      "name": "string",
      "price": "number",
      "description": "string",
      "amount": "number",
      "category_id": "string"
    }
    ```
  - **Responses**:
    - `200`: Product updated successfully
    - `404`: Product not found

- **Delete Product**
  - **DELETE** `/product`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "product_id": "string"
    }
    ```
  - **Responses**:
    - `200`: Product deleted successfully
    - `404`: Product not found

- **Sale Product**
  - **POST** `/product/sale`
  - **Headers**: Requires authentication
  - **Request Body**:
    ```json
    {
      "product_id": "string",
      "amount": "number"
    }
    ```
  - **Responses**:
    - `200`: Sale processed successfully
    - `400`: Invalid sale request

## Schemas

### User Schema
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Category Schema
```json
{
  "name": "string",
  "description": "string"
}
```

### Product Schema
```json
{
  "name": "string",
  "price": "number",
  "description": "string",
  "amount": "number",
  "category_id": "string"
}
```

### Sale Product Schema
```json
{
  "product_id": "string",
  "amount": "number"
}
```
