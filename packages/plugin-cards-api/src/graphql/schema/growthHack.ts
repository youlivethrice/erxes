import { commonDragParams, commonTypes } from './common';

export const types = `
  extend type Field @key(fields: "_id") {
    _id: String! @external
  }

  type GrowthHack @key(fields: "_id") {
    _id: String!
    hackStages: [String]
    reach: Int
    impact: Int
    confidence: Int
    ease: Int
    voteCount: Int
    votedUsers: [User]
    isVoted: Boolean
    formId: String
    scoringType: String
    formSubmissions: JSON
    formFields: [Field]
    ${commonTypes}
  }
`;

const commonQueryFields = `
  _ids: [String]
  pipelineId: String
  initialStageId: String
  stageId: String
  skip: Int
  limit: Int
  search: String
  assignedUserIds: [String]
  closeDateType: String
  hackStage: [String]
  priority: [String]
  labelIds: [String]
  userIds: [String]
  assignedToMe: String
`;

const archivedGrowthHacksParams = `
  pipelineId: String!
  search: String
  userIds: [String]
  priorities: [String]
  assignedUserIds: [String]
  labelIds: [String]
  productIds: [String]
  companyIds: [String]
  customerIds: [String]
  startDate: String
  endDate: String
  hackStages: [String]
`;

export const queries = `
  growthHackDetail(_id: String!): GrowthHack
  growthHacks(
    ${commonQueryFields}
    sortField: String
    sortDirection: Int
  ): [GrowthHack]

  growthHacksTotalCount(
    ${commonQueryFields}
  ): Int

  growthHacksPriorityMatrix(
    pipelineId: String
    search: String
    assignedUserIds: [String]
    closeDateType: String
  ): JSON

  archivedGrowthHacks(
    page: Int
    perPage: Int
    ${archivedGrowthHacksParams}
  ): [GrowthHack]
  archivedGrowthHacksCount(
    ${archivedGrowthHacksParams}
  ): Int
`;

const commonParams = `
  proccessId: String,
  aboveItemId: String,
  name: String,
  stageId: String,
  assignedUserIds: [String],
  attachments: [AttachmentInput],
  closeDate: Date,
  status: String,
  description: String,
  hackStages: [String],
  priority: String,
  reach: Int,
  impact: Int,
  confidence: Int,
  ease: Int,
`;

export const mutations = `
  growthHacksAdd(${commonParams}, labelIds: [String]): GrowthHack
  growthHacksEdit(_id: String!, ${commonParams}): GrowthHack
  growthHacksChange(${commonDragParams}): GrowthHack
  growthHacksRemove(_id: String!): GrowthHack
  growthHacksWatch(_id: String, isAdd: Boolean): GrowthHack
  growthHacksVote(_id: String!, isVote: Boolean): GrowthHack
  growthHacksCopy(_id: String!, proccessId: String): GrowthHack
  growthHacksArchive(stageId: String!, proccessId: String): String
`;
