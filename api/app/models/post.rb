class Post < ApplicationRecord
  validates :content, {presence: true, uniqueness: true, length: {maximum: 10}}
end
