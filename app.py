import requests
# This works to get all the categories
# r = requests.get(
#     url='https://api.schedjoules.com/categories/',
#     headers={
#         'Authorization': 'Token token="0443a55244bb2b6224fd48e0416f0d9c"',
#         'API-VERSION': '1'
#     },
#     timeout=5
# )
# print(r.status_code)
# if r.status_code == 200:
#     print(r.json())



# This works to get all sporting event links
sport_end_point_links = []
r = requests.get(
    url='https://api.schedjoules.com/categories/',
    headers={
        'Authorization': 'Token token="0443a55244bb2b6224fd48e0416f0d9c"',
        'API-VERSION': '1'
    },
    timeout=5
)
print(r.status_code)
if r.status_code == 200:
    for category in r.json():
        if category.get('name').find('sport') < 0:
            continue
        print('{}: {}'.format(
             category.get('name'),
             category.get('label')
         ))
        sport_end_point_links.append(category.get('name'))
