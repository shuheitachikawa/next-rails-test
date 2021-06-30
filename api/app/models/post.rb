class Post < ApplicationRecord
  validates :content, {presence: true, uniqueness: true, length: {maximum: 10}}
  validates :user_id, {presence: true}
  belongs_to :user
end
