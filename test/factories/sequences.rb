# frozen_string_literal: true

FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence :first_name, aliases: %i[last_name string password avatar name description] do |n|
    "string#{n}"
  end
  sequence :expired_at do |_n|
    Time.now + rand(10)
  end
end
