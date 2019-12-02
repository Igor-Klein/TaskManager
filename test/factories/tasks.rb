# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    name { generate :string }
    description { generate :string }
    state { 'MyString' }
    expired_at { '2019-11-28' }
  end
end
