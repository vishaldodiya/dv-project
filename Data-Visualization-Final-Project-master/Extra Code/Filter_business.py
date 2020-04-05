import pandas as pd;

col_name = ['business_id']
df_user = pd.read_csv("C:\\Users\\bhans\\Downloads\\DV Final Project\\Business_Phx_final.csv",usecols=col_name)
# print(df_business)
#col_name_review = ['user_id','stars','text','business_id','review_id']
df_tip = pd.read_csv("C:\\Users\\bhans\\Downloads\\DV Final Project\\Original Data\\tip.csv")
df_left = pd.merge(df_user, df_tip, on='business_id', how='left')
df_left.to_csv("business_tip_merge.csv",index=False)


# col_name_review = ['text']
# df_review = pd.read_csv("review.csv",usecols=col_name_review)
# df_review.to_csv("trimmed_review_text.csv",index=False)
