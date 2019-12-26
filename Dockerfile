FROM ruby:latest

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash \
 && apt-get update && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/* \
 && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update && apt-get install -y yarn && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /task_manager
WORKDIR /task_manager

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 3

COPY . /task_manager

EXPOSE 3000
CMD rm tmp/pids/server.pid; bundle exec rails s -b '0.0.0.0' -p 3000
