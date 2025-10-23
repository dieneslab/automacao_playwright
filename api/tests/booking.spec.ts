import { test, expect } from '@playwright/test'
import * as bookingData from '../data/bookingData.json'

// Define a suite for Booking API tests
test.describe('Booking API Tests', () => {
    test.describe.configure({ mode: 'serial' })
    let token: string
    let bookingId: number | undefined

    // Hook to run once before all tests in this suite
    // Used to obtain an authentication token for PUT/DELETE operations
    test.beforeAll(async ({ request, baseURL }) => {
        // 1. Get Auth Token (POST /auth)
        const authResponse = await request.post(`${baseURL}/auth`, {
            data: {
                "username": "admin",
                "password": "password123"
            }
        })

        expect(authResponse.ok()).toBeTruthy()
        const authResponseBody = await authResponse.json()
        token = authResponseBody.token
        expect(token).toBeDefined()
        console.log(`Auth Token obtained: ${token}`)
    })

    test('should be able to create a new booking (POST /booking)', async ({ request, baseURL }) => {

        // 2. Create Booking (POST /booking)
        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData.validBooking
        })

        // Assertions
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        
        // Assert response structure and data
        expect(responseBody).toHaveProperty('bookingid')
        expect(responseBody.booking.firstname).toBe(bookingData.validBooking.firstname)
        expect(responseBody.booking.totalprice).toBe(bookingData.validBooking.totalprice)

        // Store bookingId for subsequent tests (PUT/GET/DELETE)
        bookingId = responseBody.bookingid
        test.info().annotations.push({ type: 'bookingId', description: bookingId.toString() })
    })

    test('should be able to retrieve all bookings (GET /booking)', async ({ request, baseURL }) => {
        // 3. Get All Bookings (GET /booking)
        const response = await request.get(`${baseURL}/booking`)

        // Assertions
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        
        // Assert response is an array and contains at least one booking
        expect(Array.isArray(responseBody)).toBeTruthy()
        expect(responseBody.length).toBeGreaterThan(0)
    })

    test('should be able to retrieve the created booking by ID (GET /booking/{id})', async ({ request, baseURL }) => {
        // 4. Get Booking by ID (GET /booking/{id})
        // Ensure bookingId is available from the POST test


        const response = await request.get(`${baseURL}/booking/${bookingId}`)

        // Assertions
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)
        const responseBody = await response.json()

        // Assert data matches the created booking
        expect(responseBody.firstname).toBe(bookingData.validBooking.firstname)
        expect(responseBody.lastname).toBe(bookingData.validBooking.lastname)
    })

    test('should be able to update an existing booking (PUT /booking/{id})', async ({ request, baseURL }) => {
        // 5. Update Booking (PUT /booking/{id})

        expect(token).toBeDefined()

        const response = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}` // Authentication using the token
            },
            data: bookingData.updateBooking
        })

        // Assertions
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)
        const responseBody = await response.json()

        // Assert data was updated
        expect(responseBody.firstname).toBe(bookingData.updateBooking.firstname)
        expect(responseBody.totalprice).toBe(bookingData.updateBooking.totalprice)
    })

    test('should be able to delete an existing booking (DELETE /booking/{id})', async ({ request, baseURL }) => {
        // 6. Delete Booking (DELETE /booking/{id})

        expect(token).toBeDefined()

        const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}` // Authentication using the token
            }
        })

        // Assertions
        // The API returns 201 Created on successful deletion, which is a common quirk for this specific API.
        expect(response.status()).toBe(201) 

        // 7. Verify deletion (GET /booking/{id})
        const verifyResponse = await request.get(`${baseURL}/booking/${bookingId}`)
        expect(verifyResponse.status()).toBe(404) // Should return 404 Not Found
    })
})