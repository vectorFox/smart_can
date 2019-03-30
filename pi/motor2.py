import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

IN = [6, 13, 19, 26]
GPIO.setup(IN, GPIO.OUT)

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

rotate("COUNTER", 2)
