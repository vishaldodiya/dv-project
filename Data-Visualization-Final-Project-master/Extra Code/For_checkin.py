# import pandas as pd
# data = pd.read_csv("C:\\Users\\bhans\\Downloads\\DV Final Project\\Business_merge_checkin_full_csv.csv")

# print(data.head())

#2010-12-05 23:20:18
#Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
import time
from time import mktime
import datetime

import csv

with open("C:\\Users\\bhans\\Downloads\\DV Final Project\\Business_merge_checkin_full_csv.csv") as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    count = 0
    dict_forfile = {}
    for row in readCSV:
        #header = next(readCSV)
        if count!=0:
            business_id = row[0]
            #print(row[0])
            dates = row[1]
            li_split_dates = dates.split(",")
            dict_time = {}
            for i in range(0,len(li_split_dates)):
                full_val = ""
                if(li_split_dates[i].strip()!="" and li_split_dates[i]!="NA"):
                    val = time.strptime(li_split_dates[i].strip(), '%Y-%m-%d %H:%M:%S')
                    full_val = str(val.tm_hour)+":"+str(val.tm_wday)
                    if full_val in dict_time:
                        dict_time[full_val] = dict_time[full_val]+1
                    else:
                        dict_time[full_val] = 1
            #print(dict_time)
            dict_forfile[business_id] = dict_time
            #print(dict_forfile)
        count = count+1
    print(count)
    with open('C:\\Users\\bhans\\Downloads\\DV Final Project\\test.csv', 'w', newline="") as csv_file:  
        writer = csv.writer(csv_file)
        for key, value in dict_forfile.items():
            writer.writerow([key, value])
    # with open('C:\\Users\\bhans\\Downloads\\DV Final Project\\test1.csv', 'w') as f:
    #     for key in dict_forfile.keys():
    #         str1 = str(dict_forfile[key])
    #         f.write("%s,%s\n"%(key,str1))
