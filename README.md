# free-camp-map
An open source web app where tent campers can share the location of free camp sites.

Try the app ***HERE***

## contibuting / install instructions
Please contribute to the map data by signing up and adding some spots.

If you'd like to contribute to the application, follow the setup instructions:

1) Fork and clone the repo
2) `cd campmap && npm install`
3) Start python env
4) `cd backend && python3 manage.py runserver`
.

.

.

.


## Technology used
#### Frontend:
* React/Redux
* create-react-app
* [google-map-react](https://github.com/istarkov/google-map-react)
* Google Maps API (api key required)
* Material-Ui

#### Backend:
* Django / Django-REST
* Postgres / PostGIS
* ¿¿graphQL??

## User stories
* [ ] I can view a map
* [ ] I can search for a location on the map
* [ ] I can see nearby campsites as pins on the map
* [ ] I can click on a pin for more details about the campsite
* [ ] I can return to the map from the detail view
* [ ] I can share the link to a campsite
* [ ] I can login/signup
* [ ] I can save/star campsites
* [ ] I can add a campsite to the map
* [ ] I can rate campsites I've been to
* [ ] I can comment on a campsite
* [ ] I can submit edits to campsite info
* [ ] I can positively or negatively verify a campsite that I have visited
* [ ] I can upload pictures of a campsite
* [ ] I can sort my favorite sites by distance
* [ ] I can refresh the page without losing my data while viewing, creating, editing sites
* [ ] I can see the username of whoever created and last updated the site info
* [ ] Sites I create will automatically be added to my favorites
* [ ] Sites I create will be visually distinct from other sites
* [ ] I can see how long its been since the campsite has been updated

Trello: https://trello.com/b/tisXBo5l/free-sites

## Data Models
#### User
- username: *string*
- google_id: *string*
- favorites: *[]Campsite* (many-to-many)
- email: *string*

#### Campsite
- name: *string*
- location(lat, lon): *geo tuple*
- description: *string*
- directions: *string*
- positive_verify_count: *int*
- negative_verify_count: *int*
- photos: *file*
- rating: *double* (updated with calculate rating method)
- favorited_by (hidden): *[]User* (many-to-many)
- creator: *User_id* (one-to-many)
- updated_at: *datetime*
- last_updater: *User_id* (one-to many)

#### Comment
- author: *User_id* (one-to-many)
- content: *string*
- created at: *datetime*
- campsite: *Campsite_id* (one-to-many)

#### Ratings
- campsite: *Campsite_id*
- rater: *User_id*

## Wireframes/Mockups
#### Mobile

#### Desktop

#### Nav/Drawer

#### Detail component

#### Favorites list

