package com.jamsy.shop.constants;

public class ApiConstants {

    public static final String API_VERSION_V1 = "/api/v1";

    // Auth endpoints
    public static final String AUTH_BASE = API_VERSION_V1 + "/auth";
    public static final String LOGIN_ENDPOINT = "/login";
    public static final String REGISTER_ENDPOINT = "/register";
    public static final String REFRESH_ENDPOINT = "/refresh";
    public static final String LOGOUT_ENDPOINT = "/logout";

    // User endpoints
    public static final String USERS_BASE = API_VERSION_V1 + "/users";

    // Appointment endpoints
    public static final String APPOINTMENTS_BASE = API_VERSION_V1 + "/appointments";

    // Employee endpoints
    public static final String EMPLOYEES_BASE = API_VERSION_V1 + "/employees";

    // Service endpoints
    public static final String SERVICES_BASE = API_VERSION_V1 + "/services";

    // Product endpoints
    public static final String PRODUCTS_BASE = API_VERSION_V1 + "/products";

    // Financial endpoints
    public static final String FINANCIAL_BASE = API_VERSION_V1 + "/financial";

    // Contact endpoints
    public static final String CONTACT_BASE = API_VERSION_V1 + "/contact";

    // Review endpoints
    public static final String REVIEWS_BASE = API_VERSION_V1 + "/reviews";

    // Common response messages
    public static final String SUCCESS_MESSAGE = "Operation completed successfully";
    public static final String CREATED_MESSAGE = "Resource created successfully";
    public static final String UPDATED_MESSAGE = "Resource updated successfully";
    public static final String DELETED_MESSAGE = "Resource deleted successfully";
    public static final String NOT_FOUND_MESSAGE = "Resource not found";
    public static final String UNAUTHORIZED_MESSAGE = "Unauthorized access";
    public static final String FORBIDDEN_MESSAGE = "Access forbidden";
    public static final String VALIDATION_ERROR_MESSAGE = "Validation error";

    private ApiConstants() {
        // Private constructor to prevent instantiation
    }
}