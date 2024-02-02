from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import cv2
import os

app = FastAPI()

class EmployeeIDRequest(BaseModel):
    employee_id: str

@app.post('/employee-images/add/')
async def gather_employee_images(request: EmployeeIDRequest):
    try:
        process_images(request.employee_id)
        return JSONResponse(content={"success": True, "message": "Image gathering completed successfully."})
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"success": False, "error": "Internal Server Error"})

def process_images(employee_id):
    if employee_id is None:
        raise ValueError("Employee ID cannot be None")

    video = cv2.VideoCapture(0)
    if not video.isOpened():
        raise ValueError("Failed to initialize video capture")

    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    if face_cascade.empty():
        raise ValueError("Failed to load face detection model")

    count = 0

    path = f'images/{employee_id}'
    if os.path.exists(path):
        print("Employee ID Already Exists")
        return
    os.makedirs(path)

    while count <= 500:
        ret, frame = video.read()
        if not ret:
            raise ValueError("Failed to capture frame")

        faces = face_cascade.detectMultiScale(frame, scaleFactor=1.3, minNeighbors=5)
        for x, y, w, h in faces:
            count += 1
            image_path = f'./images/{employee_id}/{count}.jpg'
            print(f"Creating Image.........{image_path}")
            cv2.imwrite(image_path, frame[y:y + h, x:x + w])
            cv2.putText(frame, f"Count: {count}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
        cv2.imshow("Gathering Employee Images Face Data", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    video.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5000)
