admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost.ru')
admin.password = 'admin'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email1#{i}@mail.gen"
  u.first_name = "FN#{i}"
  u.last_name = "LN#{i}"
  u.password = i.to_s
  u.save
end

users = Developer.all
5.times do |i|
  state = 'in_development' if i.even?
  state = 'in_qa' if (i % 3).zero?
  state = 'in_code_review' if (i % 4).zero?
  state = 'ready_for_release' if (i % 5).zero?
  users.each do |user|
    Task.create(author: user, name: "#{i}_Test_ + #{user.first_name}", description: "test_#{i} + #{user.last_name}", state: state)
  end
end
