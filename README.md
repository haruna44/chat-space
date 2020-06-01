# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## userテーブル

|Colum|Type|Option|
|-----|----|------|
|name|string|null: false,index: true|
|email|integer|null: false|
|password|integer|null: false|

### Association
- has_many :groups
- has_many : groups through:  :groups_users
- has_many :posts


## groupテーブル
|Colum|Type|Option|
|-----|----|------|
|name|string|null:false,unique:true|

### Asscoiation
- has_many :users through: :group_users
- has-many: group_users
- has_many :posts


## postsテーブル
|Colum|Type|Option|
|-----|----|------|
|text|text|| 
|image|text||
|user|reference|null:false,foreign_key: true |
|group|reference|null:false,foreign_key: true |

### Association
- belongs_to :user
- belongs_to :group


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
