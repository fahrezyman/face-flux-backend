import requests

def test_employee_images_endpoint():
    url = "http://localhost:5000/employee-images/add/"
    employee_id = ""  # Replace with an actual employee ID

    response = requests.post(url, data={"employee_id": employee_id})

    print(response.status_code)
    print(response.json())

if __name__ == "__main__":
    test_employee_images_endpoint()
