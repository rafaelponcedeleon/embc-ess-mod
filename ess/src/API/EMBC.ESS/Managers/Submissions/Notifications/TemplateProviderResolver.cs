﻿// -------------------------------------------------------------------------
//  Copyright © 2021 Province of British Columbia
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// -------------------------------------------------------------------------

using System;
using System.Threading.Tasks;

namespace EMBC.ESS.Managers.Submissions
{
    public interface ITemplateProviderResolver
    {
        ITemplateProvider Resolve(NotificationChannelType channelType);
    }

    public class TemplateProviderResolver : ITemplateProviderResolver
    {
        private readonly Func<NotificationChannelType, ITemplateProvider> resolver;

        public TemplateProviderResolver(Func<NotificationChannelType, ITemplateProvider> resolver) => this.resolver = resolver;

        public ITemplateProvider Resolve(NotificationChannelType channelType) => resolver(channelType);
    }

    public interface ITemplateProvider
    {
        Task<Template> Get(SubmissionTemplateType template);
    }

    public enum NotificationChannelType
    {
        Email
    }

    public enum SubmissionTemplateType
    {
        NewEvacuationFileSubmission,
        NewAnonymousEvacuationFileSubmission,
        newProfileRegistration
    }

    public abstract class Template { }
}
