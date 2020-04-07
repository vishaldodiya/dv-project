# import pandas as pd
# data = pd.read_csv("C:\\Users\\bhans\\Downloads\\DV Final Project\\Business_merge_checkin_full_csv.csv")

# print(data.head())

#2010-12-05 23:20:18
#Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
import time
from time import mktime
import datetime

import csv

with open("C:\\Users\\bhans\\Downloads\\DV Final Project\\business_review_FULL.csv") as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    count = 0
    dict_forfile = {}
    for row in readCSV:
        #header = next(readCSV)
        if count!=0:
            business_id = row[0]
            #print(row[0])
            stars = row[2]
            if business_id in dict_forfile:
                dict_forfile[business_id].append(stars)
            else:
                dict_forfile[business_id] = [stars]
        count = count+1
    print(count)

    dict_starcount = {}
    dict_business_star_count = {}
    for key, value in dict_forfile.items():
        dict_starcount = {}
        for i in range(0,len(value)):
            if value[i] in dict_starcount:
                dict_starcount[value[i]] = dict_starcount[value[i]]+1
            else:
                dict_starcount[value[i]] = 1
        dict_business_star_count[key] = dict_starcount
    
    # with open('C:\\Users\\bhans\\Downloads\\DV Final Project\\business_stars.csv', 'w', newline="") as csv_file:  
    #     writer = csv.writer(csv_file)
    #     for key, value in dict_business_star_count.items():
    #         writer.writerow([key, value])

    with open('C:\\Users\\bhans\\Downloads\\DV Final Project\\business_stars_count.csv', 'w', newline="") as csv_file:  
        writer = csv.writer(csv_file)
        for key, value in dict_business_star_count.items():
            writer.writerow([key, value])
    # with open('C:\\Users\\bhans\\Downloads\\DV Final Project\\test1.csv', 'w') as f:
    #     for key in dict_forfile.keys():
    #         str1 = str(dict_forfile[key])
    #         f.write("%s,%s\n"%(key,str1))
