# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name
    description
    author { create :user }
    assignee_id { create :user }
  end
end
