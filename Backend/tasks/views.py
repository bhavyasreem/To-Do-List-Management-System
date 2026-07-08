from bson import ObjectId
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .db import collection



@api_view(['POST'])
def add_task(request):

    data = request.data

    task = {
        "title": data["title"],
        "description": data["description"],
        "priority": data["priority"],
        "status": data["status"]
    }

    collection.insert_one(task)

    return JsonResponse({
        "message": "Task Added Successfully"
    })



@api_view(['GET'])
def get_tasks(request):

    tasks = []

    for task in collection.find():

        task["_id"] = str(task["_id"])

        tasks.append(task)

    return JsonResponse(tasks, safe=False)



@api_view(['PUT'])
def update_task(request, id):

    data = request.data

    collection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "title": data["title"],
                "description": data["description"],
                "priority": data["priority"],
                "status": data["status"]
            }
        }
    )

    return JsonResponse({
        "message": "Task Updated Successfully"
    })



@api_view(['DELETE'])
def delete_task(request, id):

    collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return JsonResponse({
        "message": "Task Deleted Successfully"
    })