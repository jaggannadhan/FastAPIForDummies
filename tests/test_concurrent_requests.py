import asyncio
import httpx
import time

URL = "http://127.0.0.1:8000/async-task"

async def send_single_request():
    async with httpx.AsyncClient() as client:
        start_time = time.time()
        response = await client.get(URL)
        elapsed_time = time.time() - start_time
        print(f"Single request took {elapsed_time:.2f} seconds. Response: {response.json()}")


async def send_concurrent_requests(num_requests):
    async with httpx.AsyncClient() as client:
        start_time = time.time()
        # Create a list of tasks for concurrent requests
        tasks = [client.get(URL) for _ in range(num_requests)]
        responses = await asyncio.gather(*tasks)
        elapsed_time = time.time() - start_time
        print(f"{num_requests} concurrent requests took {elapsed_time:.2f} seconds.")
        for i, response in enumerate(responses):
            print(f"Response {i + 1}: {response.json()}")


async def main():
    print("Testing single request...")
    await send_single_request()

    print("\nTesting 20 concurrent requests...")
    await send_concurrent_requests(20)


if __name__ == "__main__":
    asyncio.run(main())