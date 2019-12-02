# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  validates :name, presence: true
  validates :name, length: { minimum: 2 }
  validates :surname, presence: true
  validates :surname, length: { minimum: 2 }
  validates :email, presence: true
  validates :email, format: { with: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/ }
  validates :email, uniqueness: true
end
