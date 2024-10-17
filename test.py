#!/usr/bin/env python

import io
import os
from google.cloud import vision
import glob

# 设置Google Cloud服务账号路径
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/vector/test101-438313.json"

# 创建Vision API客户端
client = vision.ImageAnnotatorClient()

# 要进行标签检测的图像文件夹路径
folder_path = os.path.join(os.path.dirname(__file__), 'images')
# 查找所有支持的图像格式
image_files = glob.glob(os.path.join(folder_path, '*.jpg')) + \
              glob.glob(os.path.join(folder_path, '*.JPG')) + \
              glob.glob(os.path.join(folder_path, '*.png')) + \
              glob.glob(os.path.join(folder_path, '*.PNG'))
# 遍历每个图像文件
for file_name in image_files:
    # 加载图像
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    # 创建图像对象
    image = vision.Image(content=content)

    # 执行标签检测
    response = client.label_detection(image=image)
    labels = response.label_annotations

    # 打印文件名、标签和置信度
    print(f"\nFile: {os.path.basename(file_name)}")
    print("Labels and Confidence Scores:")
    for label in labels:
        print(f" - {label.description}: {label.score * 100:.2f}%")