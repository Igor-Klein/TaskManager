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

# Generate microposts for a subset of users.
users = Developer.all
20.times do |i|
  state = "in_development" if i % 2 == 0
  state = "in_qa" if i % 3 == 0
  state = "in_code_review" if i % 5 == 0
  state = "ready_for_release" if i % 10 == 0
  users.each do |user| 
    Task.create(author: user, name: "Test_#{i}", description: "test_#{i}", state: state)
  end 
end
