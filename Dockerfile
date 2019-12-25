FROM ruby:latest


RUN apt-get update -qq && apt-get install -y build-essential nodejs \
 && rm -rf /var/lib/apt/lists/* \
 && curl -o- -L https://yarnpkg.com/install.sh | bash


RUN mkdir -p /task_manager
WORKDIR /task_manager

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 3

COPY . /task_manager

EXPOSE 3000
CMD rm tmp/pids/server.pid; bundle exec rails s -b '0.0.0.0' -p 3000
