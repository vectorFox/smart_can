from picamera import PiCamera
from time import sleep
from gpiozero import DistanceSensor
# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore
import requests

import os
import io
import RPi.GPIO as GPIO
import time

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

# Initialize Database
# cred = credentials.Certificate('./admin.json')
# firebase_admin.initialize_app(cred)
# db = firestore.client()

camera = PiCamera()

#functions
def take_picture():
    #camera.zoom(0.0, 0.0 ,1.0,1.0)
    camera.start_preview()
    sleep(1)
    camera.capture('captured/img.jpg')
    camera.stop_preview()

def get_image_details():
    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    # The name of the image file to annotate
    file_name = os.path.join(
        os.path.dirname(__file__),
        'captured/img.jpg')

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    print('Labels:')
    obj = labels[0]
    for label in labels:
        print(label.description)

    #os.remove('captured/img.jpg')
    return labels

def updateDatabase(category, tags):
    sleep(0)
    # Add Item Entry
    #item = db.collection('activity').document()
    #item.set({
        #'category': category,
        #'tags': tags,
        #'timestamp': firestore.SERVER_TIMESTAMP
    #})

    # Update Current Stats
    #stats = db.collection('global').document('stats').get().to_dict()
    #newTrash = stats['trashCount'] + (category == "trash")
    #newRecycle = stats['recycleCount'] + (category == "recycle")
    #db.collection('global').document('stats').update({
        #'trashCount': newTrash,
        #'recycleCount': newRecycle
    #})


def rotate (direction, rotations):
    dir = 1 if direction=="CLOCK" else -1
    steps = [ [GPIO.HIGH, GPIO.LOW,  GPIO.LOW,  GPIO.LOW],
          [GPIO.LOW,  GPIO.HIGH, GPIO.LOW,  GPIO.LOW],
          [GPIO.LOW,  GPIO.LOW,  GPIO.HIGH, GPIO.LOW],
          [GPIO.LOW,  GPIO.LOW,  GPIO.LOW,  GPIO.HIGH] ]
    current_step = 0
    remain = rotations * 2000

    while (remain > 0):
        for pin in range(4):
            GPIO.output(IN[pin], steps[current_step][pin])
        current_step = (current_step + dir) % 4
        remain -= 1
        time.sleep(.002)

#pin setup
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

IN = [6, 13, 19, 26]
GPIO.setup(IN, GPIO.OUT)

#important variables
ultrasonic = DistanceSensor(echo=17, trigger=4)
recyclables = ['paper','bottle', 'plastic', 'container', 'can', 'glass', 'cardboard', 'soft drinks', 'cola']

while True:
    ultrasonic.wait_for_in_range()
    time.sleep(2)
    print("OBJECT PRESENT")          
    take_picture()
    labels = get_image_details()

    is_recyclable = False

    for r in recyclables:
        for l in labels:
            if l.description.lower() in r or r in l.description.lower():
                is_recyclable = True
                break
        if is_recyclable:
            break

    desc = []
    for l in labels:
        desc.append(l.description)
        
    url="https://us-central1-smart-can-dc74d.cloudfunctions.net/helloWorld"
    data={ "type": "recycle" if is_recyclable else "trash", 'labels':desc}
    if is_recyclable:
        #requests.post('https://us-central1-smart-can-d74d.cloudfunctions.net/helloWorld', data = { 'type':'recycable', 'labels':','.join(labels.description)})
        r = requests.post(url, json = data )
        print "r"
        rotate("COUNTER", 0.5)
        time.sleep(1)
        rotate("CLOCK" , 0.5)
        updateDatabase("recycle", labels)
    else:                                                                                                                                                  
        #request.post('https://us-central1-smart-can-d74d.cloudfunctions.net/helloWorld', data = { 'type':'non-recycable', 'labels':','.join(labels.description)})
        r = requests.post(url, json = data )
        print "t"
        rotate("CLOCK" , 0.5)
        time.sleep(1)
        rotate("COUNTER" , 0.5)
        updateDatabase("trash", labels)
