class Task < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  enum progress: { pending: 0, completed: 1 }
  validates :title, presence: true
end