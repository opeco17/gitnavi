package main

import (
	"opeco17/gitnavi/lib"
	"strings"

	"github.com/google/go-github/v41/github"
	"gorm.io/gorm"
)

func convertRepository(gitHubRepository *github.Repository) *lib.Repository {
	name := ""
	if gitHubRepository.FullName != nil {
		name = *gitHubRepository.FullName
	}

	url := ""
	if gitHubRepository.HTMLURL != nil {
		url = *gitHubRepository.HTMLURL
	}

	description := ""
	if gitHubRepository.Description != nil {
		description = *gitHubRepository.Description
	}

	license := ""
	if gitHubRepository.License != nil && gitHubRepository.License.Name != nil {
		license = *gitHubRepository.License.Name
	}

	language := ""
	if gitHubRepository.Language != nil {
		language = *gitHubRepository.Language
	}

	topics := ""
	if gitHubRepository.Topics != nil {
		topics = strings.Join(gitHubRepository.Topics, ",")
	}

	repository := &lib.Repository{
		Model:            gorm.Model{ID: uint(*gitHubRepository.ID)},
		GitHubCreatedAt:  gitHubRepository.CreatedAt.Time,
		GitHubUpdatedAt:  gitHubRepository.UpdatedAt.Time,
		Name:             name,
		URL:              url,
		Description:      description,
		StarCount:        gitHubRepository.StargazersCount,
		ForkCount:        gitHubRepository.ForksCount,
		OpenIssueCount:   gitHubRepository.OpenIssuesCount,
		License:          license,
		Language:         language,
		IssueInitialized: false,
		Topics:           topics,
	}
	return repository
}

func convertUser(gitHubUser *github.User) *lib.User {
	name := ""
	if gitHubUser.Name != nil {
		name = *gitHubUser.Name
	}

	url := ""
	if gitHubUser.HTMLURL != nil {
		url = *gitHubUser.HTMLURL
	}

	avatarURL := ""
	if gitHubUser.AvatarURL != nil {
		avatarURL = *gitHubUser.AvatarURL
	}

	user := &lib.User{
		Model:     gorm.Model{ID: uint(*gitHubUser.ID)},
		Name:      name,
		URL:       url,
		AvatarURL: avatarURL,
	}
	return user
}

func convertLabels(gitHubLabels []*github.Label) []*lib.Label {
	labels := make([]*lib.Label, 0, len(gitHubLabels))
	for _, gitHubLabel := range gitHubLabels {
		name := ""
		if gitHubLabel.Name != nil {
			name = *gitHubLabel.Name
		}
		label := &lib.Label{
			Model: gorm.Model{ID: uint(*gitHubLabel.ID)},
			Name:  name,
		}
		labels = append(labels, label)
	}
	return labels
}

func convertIssue(gitHubIssue *github.Issue) *lib.Issue {
	issuer := new(lib.User)
	if gitHubIssue.User != nil {
		issuer = convertUser(gitHubIssue.User)
	}

	labels := make([]*lib.Label, 0)
	if gitHubIssue.Labels != nil {
		labels = convertLabels(gitHubIssue.Labels)
	}

	var assigneesCount *int
	if gitHubIssue.Assignees != nil {
		assigneesCountValue := len(gitHubIssue.Assignees)
		assigneesCount = &assigneesCountValue
	}

	pullRequestURL := ""
	if gitHubIssue.PullRequestLinks != nil && gitHubIssue.PullRequestLinks.HTMLURL != nil {
		pullRequestURL = *gitHubIssue.PullRequestLinks.HTMLURL
	}

	issue := &lib.Issue{
		Model:           gorm.Model{ID: uint(*gitHubIssue.ID)},
		GitHubCreatedAt: *gitHubIssue.CreatedAt,
		GitHubUpdatedAt: *gitHubIssue.UpdatedAt,
		Title:           *gitHubIssue.Title,
		URL:             *gitHubIssue.HTMLURL,
		PullRequestURL:  pullRequestURL,
		AssigneesCount:  assigneesCount,
		CommentCount:    gitHubIssue.Comments,
		Issuer:          issuer,
		Labels:          labels,
	}
	return issue
}
