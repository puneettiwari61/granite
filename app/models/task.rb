class Task < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  enum progress: { pending: 0, completed: 1 }
  enum status: { unstarred: 0, starred: 1 }
  validates :title, presence: true

  private

  def self.organize(progress)
    starred = send(progress).starred.order("updated_at DESC")
    unstarred = send(progress).unstarred
    starred + unstarred
  end
end
