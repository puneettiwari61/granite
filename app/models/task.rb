class Task < ApplicationRecord
  # after_create :log_task_details
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

  def log_task_details
    TaskLoggerJob.perform_later(self)
  end
end
