# Group Service

This is the groups microservice for the Adio project. It is reponisbile for creating, reading, and updating groups.

## Types
### Group
**_id**: `string` Unique ID of a group. 

**name**: `string` Name of the group. 

**userIds**: `Array<string>` A list of user ids that belong to this group.

**projectIds**: `Array<string>` A list of projects that belong to this group.

### GroupInput
**name**: Name of the new group

**userIds**: A list of user ids that the belong to this group

**projectIds**: A list of project ids that belong to this group.


## Endpoints

### Get Groups
##### Endpoint:
**GET** `/groups?ids=[id,id,id]`

##### Returns:
`Array<Group>`

Used for fetching multiple groups by ids. You must include the `ids` query param as a comma separated list of group ids.

### Get Group
##### Endpoint:
**GET** `/groups/{id}`

##### Returns:
`Group`

Used For fetching one group by id.

### Create Group
##### Endpoint:
**POST** `/groups`

##### Params:
`GroupInput`

##### Returns:
`Group`

### Add Project
##### Endpoint:
**PUT** `/groups/{id}/projects`

##### Params:
**projectId** `string` Project id to add to a group

##### Returns:
`Group`

### Remove Project
##### Endpoint:
**DELETE** `/groups/{id}/projects`

##### Params:
**projectId** `string` Project id to add to a group

##### Returns:
`Group`